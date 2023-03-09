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

const App = () => {
    const [tone, setTone] = useState('Candid');
    const [framework, setFramework] = useState('PASTOR');
    const [companyDescription, setCompanyDescription] = useState();
    const [resultAdvertisement, setResultAdvertisement] = useState();

    const onToneChange = (event) => {
        setTone(event.target.value);
    };

    const onFrameworkChange = (event) => {
        setFramework(event.target.value);
    };

    const onCompanyDescriptionChange = (event) => {
        setCompanyDescription(event.target.value);
    };

    const onComposeClick = async () => {
        console.log(tone);
        console.log(framework);
        console.log(companyDescription);

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": `Compose proposal using ${framework} framework with ${tone} tone regarding company with this description: (${companyDescription})`
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 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',
                },
            }
        );
        const resultAiOutput = response.data.choices[0].message.content.trim();

        setResultAdvertisement(resultAiOutput);
    };

    return (
        <div className="row gx-5 m-4">
            <div className="col-4">
                <div>
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
                    <button onClick={onComposeClick} className="btn btn-primary">
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
