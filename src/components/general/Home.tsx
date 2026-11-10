import { api } from "@/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { ArrowLeft, LucideSmile, PersonStanding } from "lucide-react";
import { useProfileStore } from "@/store/profile";
import { Tabs, useUiStore } from "@/store/ui";
import { Language } from "@shared/profile.interface";
import { ButtonGroup } from "../ui/button-group";

export default function Home() {
    const [newProfileMode, setNewProfileMode] = useState(false);

    return (
        <motion.div 
            className="w-full h-full flex items-center justify-center p-4" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
        >
            {!newProfileMode ? <ExistingProfilesCard setNewProfileMode={setNewProfileMode} /> : <NewProfileForm setNewProfileMode={setNewProfileMode} />}
        </motion.div>
    )
}

const ExistingProfilesCard = ({setNewProfileMode}: {setNewProfileMode: (mode: boolean) => void}) => {
    const [profiles, setProfiles] = useState<{id: string, firstName: string; lastName: string; language: Language}[]>([]);
    const { loadProfile } = useProfileStore();
    const { setSelectedTab, setAiAvailable } = useUiStore();

    useEffect(() => {
        const fetchProfiles = async () => {
            const profilesList = await api.getProfilesList();
            if(profilesList && Array.isArray(profilesList)) {
                const profilesData = profilesList.map((profileName: string) => {
                    const [firstName, lastName, language] = profileName.split('_');
                    return { id: profileName, firstName, lastName, language: language as Language };
                });
                setProfiles(profilesData);
            }
        }
        fetchProfiles();
    }, []);

    useEffect(() => {
        const checkAI = async () => {
            const isAIAvailable = await api.checkAIAvailability();
            setAiAvailable(isAIAvailable);
        }
        checkAI();
    }, [setAiAvailable]);

    const handleProfileSelect = (profileId: string) => {
        const selectedProfile = profiles.find(profile => profile.id === profileId);
        if (selectedProfile) {
            loadProfile(selectedProfile.id);
            setSelectedTab(Tabs.DASHBOARD);
        }
    }

    return (
        <Card className="w-1/3 mx-auto">
            <CardHeader>
                <CardTitle>已有档案</CardTitle>
                <CardDescription>选择一份档案继续，或新建一份。</CardDescription>
            </CardHeader>
            <CardContent>
                {profiles.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {profiles.map((profile) => (
                            <li key={profile.id} className="hover:underline cursor-pointer" onClick={() => handleProfileSelect(profile.id)}>
                                {profile.firstName} {profile.lastName} {profile.language && `(${profile.language})`}
                            </li>
                        ))}
                    </ul>
                ) : (<p>还没有档案，先新建一份。</p>)}
            </CardContent>
            <CardFooter>
                <Button variant={"outline"} className="m-2" onClick={() => setNewProfileMode(true)}>
                    新建档案
                </Button>
            </CardFooter>
        </Card>
    )
}

const NewProfileForm = ({ setNewProfileMode }: { setNewProfileMode: (mode: boolean) => void }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [language, setLanguage] = useState(Language.ENGLISH);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstname || !lastname) {
            setError('名和姓都要填写');
            return;
        }
        const result = await api.addProfile(firstname, lastname, language);
        if (result.success) {
            setNewProfileMode(false);
        } else {
            setError(result.error || '创建失败，请重试');
        }
    }

    return (
        <Card className="w-1/3 mx-auto">
            <CardHeader>
                <button
                    onClick={() => setNewProfileMode(false)}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    返回
                </button>
                <CardTitle>新建档案</CardTitle>
                <CardDescription>填写姓名并选择简历语言，之后可以随时修改。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <InputGroup>
                    <InputGroupInput placeholder="名，如 Xiaoming" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <InputGroupAddon>
                        <PersonStanding className="text-muted-foreground" />
                    </InputGroupAddon>
                </InputGroup>
                <InputGroup>
                    <InputGroupInput placeholder="姓，如 Zhang" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    <InputGroupAddon>
                        <LucideSmile className="text-muted-foreground" />
                    </InputGroupAddon>
                </InputGroup>
                <ButtonGroup>
                    <Button variant={language === Language.ENGLISH ? 'default' : 'outline'} onClick={() => setLanguage(Language.ENGLISH)} disabled={language === Language.ENGLISH}>
                        英语
                    </Button>
                    <Button variant={language === Language.FRENCH ? 'default' : 'outline'} onClick={() => setLanguage(Language.FRENCH)} disabled={language === Language.FRENCH}>
                        法语
                    </Button>
                </ButtonGroup>
                <Button className="cursor-pointer" onClick={handleSubmit}>创建档案</Button>
                {error && <p className="text-red-500">{error}</p>}
            </CardContent>
        </Card>
    )
}