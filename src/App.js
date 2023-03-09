import './App.css';
import {useState} from "react";
import axios from "axios";

const tones = [
    {
        "label": "Appreciative",
        "value": "Appreciative"
    },
    {
        "label": "Assertive",
        "value": "Assertive"
    },
    {
        "label": "Awestruck",
        "value": "Awestruck"
    },
    {
        "label": "Candid",
        "value": "Candid"
    },
    {
        "label": "Casual",
        "value": "Casual"
    },
    {
        "label": "Cautionary",
        "value": "Cautionary"
    },
    {
        "label": "Compassionate",
        "value": "Compassionate"
    },
    {
        "label": "Convincing",
        "value": "Convincing"
    },
    {
        "label": "Critical",
        "value": "Critical"
    },
    {
        "label": "Earnest",
        "value": "Earnest"
    },
    {
        "label": "Enthusiastic",
        "value": "Enthusiastic"
    },
    {
        "label": "Formal",
        "value": "Formal"
    },
    {
        "label": "Funny",
        "value": "Funny"
    },
    {
        "label": "Humble",
        "value": "Humble"
    }
];
const frameworks = [
    {
        "label": "ACCA",
        "value": "ACCA"
    },
    {
        "label": "ADA",
        "value": "ADA"
    },
    {
        "label": "AGREE",
        "value": "AGREE"
    },
    {
        "label": "AIDA",
        "value": "AIDA"
    },
    {
        "label": "APP",
        "value": "APP"
    },
    {
        "label": "BAB",
        "value": "BAB"
    },
    {
        "label": "CARE",
        "value": "CARE"
    },
    {
        "label": "THE 4CS",
        "value": "THE 4CS"
    },
    {
        "label": "DANNY INY’S 6+1 FORMULA",
        "value": "DANNY INY’S 6+1 FORMULA"
    },
    {
        "label": "FAB",
        "value": "FAB"
    },
    {
        "label": "FABER",
        "value": "FABER"
    },
    {
        "label": "FEEL",
        "value": "FEEL"
    },
    {
        "label": "PAS",
        "value": "PAS"
    },
    {
        "label": "PASO",
        "value": "PASO"
    },
    {
        "label": "4U",
        "value": "4U"
    },
    {
        "label": "SCAMPER",
        "value": "SCAMPER"
    },
    {
        "label": "SLAP",
        "value": "SLAP"
    },
    {
        "label": "PASTOR",
        "value": "PASTOR"
    },
    {
        "label": "PPPP",
        "value": "PPPP"
    },
    {
        "label": "QUEST",
        "value": "QUEST"
    },
    {
        "label": "SSS",
        "value": "SSS"
    },
    {
        "label": "SPEAR",
        "value": "SPEAR"
    },
    {
        "label": "STEPPS",
        "value": "STEPPS"
    },
    {
        "label": "SW",
        "value": "SW"
    },
    {
        "label": "STAR",
        "value": "STAR"
    },
    {
        "label": "STORYTELLING",
        "value": "STORYTELLING"
    }
];
const languages = [
    { "label": "English", "value": "English" },
    { "label": "French", "value": "French" },
    { "label": "Spanish", "value": "Spanish" },
    { "label": "German", "value": "German" },
    { "label": "Italian", "value": "Italian" },
    { "label": "Portuguese", "value": "Portuguese" },
    { "label": "Dutch", "value": "Dutch" },
    { "label": "Russian", "value": "Russian" },
    { "label": "Chinese", "value": "Chinese" },
    { "label": "Japanese", "value": "Japanese" },
    { "label": "Korean", "value": "Korean" }
]

const saltHelper = "3jA0FrwWkgxIQ/x3MfGPXg2mexIvp6TOEtotXptxorq0O14kbvlMAu7t!!/djqIS";
const encryptedToken = "1f07410a2b1f152b29081a1c5b5c5e2b083b093d1e1d3e385f2e000e072a261b2a1924362b2a1d1e213f340d1801183a1a3d06";

const App = () => {
    const [tone, setTone] = useState('Candid');
    const [framework, setFramework] = useState('AIDA');
    const [language, setLanguage] = useState('English');
    const [companyDescription, setCompanyDescription] = useState();
    const [resultAdvertisement, setResultAdvertisement] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const onToneChange = (event) => {
        setTone(event.target.value);
    };

    const onFrameworkChange = (event) => {
        setFramework(event.target.value);
    };

    const onLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const onCompanyDescriptionChange = (event) => {
        setCompanyDescription(event.target.value);
    };

    /*
    const cipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

        return text => text.split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('');
    }
     */

    const decipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 16))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('');
    }

    const onComposeClick = async () => {
        //const tokenCipher = cipher(saltHelper);
        //console.log(tokenCipher('<some-key>'));

        const tokenDecipher = decipher(saltHelper);
        const openAiToken = tokenDecipher(encryptedToken);

        setIsLoading(true);
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": `Compose advertising text in ${language} language using ${framework} framework with ${tone} tone regarding company with this description: (${companyDescription})`
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openAiToken}`,
                },
            }
        );
        const resultAiOutput = response.data.choices[0].message.content.trim();
        setResultAdvertisement(resultAiOutput);
        setIsLoading(false);
    };

    return (
        <div className="row gx-5 m-4">
            <div className="col-4">
                <div>
                    <label className="form-label">
                        Language
                    </label>
                    <select value={language} onChange={onLanguageChange} className="form-select">
                        {languages.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label className="form-label">
                        Tone
                    </label>
                    <select value={tone} onChange={onToneChange} className="form-select">
                        {tones.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label className="form-label">
                        Framework
                    </label>
                    <select value={framework} onChange={onFrameworkChange} className="form-select">
                        {frameworks.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label className="form-label">
                        Company Description
                    </label>
                    <textarea onChange={onCompanyDescriptionChange} className="form-control" rows="4">
                    </textarea>
                </div>
                <div className="mt-5">
                    <button onClick={onComposeClick} className="btn btn-primary" disabled={isLoading}>
                        Compose
                    </button>
                </div>
            </div>
            <div className="col-6">
                <label className="form-label">
                    Advertisement
                </label>
                <textarea
                    value={resultAdvertisement}
                    className="form-control"
                    rows="16">
                </textarea>
            </div>
        </div>
    );
}

export default App;
