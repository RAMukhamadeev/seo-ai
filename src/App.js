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
    {"label": "English", "value": "en"},
    {"label": "French", "value": "fr"},
    {"label": "Spanish", "value": "es"},
    {"label": "German", "value": "de"},
    {"label": "Italian", "value": "it"},
    {"label": "Portuguese", "value": "pt"},
    {"label": "Dutch", "value": "nl"},
    {"label": "Russian", "value": "ru"},
    {"label": "Chinese", "value": "zh"},
    {"label": "Japanese", "value": "ja"},
    {"label": "Korean", "value": "ko"}
];

const saltHelper = "3jA0FrwWkgxIQ/x3MfGPXg2mexIvp6TOEtotXptxorq0O14kbvlMAu7t!!/djqIS";
const encryptedToken = "1f07410a2b1f152b29081a1c5b5c5e2b083b093d1e1d3e385f2e000e072a261b2a1924362b2a1d1e213f340d1801183a1a3d06";
const currentUserLanguage = () => {
    const browserLanguage = navigator.language.split("-")[0];
    let userLanguage = 'en';
    if (languages.some((language) => language.value === browserLanguage)) {
        userLanguage = browserLanguage;
    }
    return userLanguage;
};

const App = () => {
    const [tone, setTone] = useState('Candid');
    const [framework, setFramework] = useState('AIDA');
    const [language, setLanguage] = useState(currentUserLanguage());
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
    const decipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 16))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('');
    }
    // const tokenCipher = cipher(saltHelper);
    // console.log(tokenCipher('<some-key>'));
    // const tokenDecipher = decipher(saltHelper);
    // const openAiToken = tokenDecipher(encryptedToken);

    const onComposeClick = async () => {
        const tokenDecipher = decipher(saltHelper);
        const openAiToken = tokenDecipher(encryptedToken);

        setIsLoading(true);
        setResultAdvertisement('');
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": `Compose advertising text in ${language} language using ${framework} framework with ${tone} tone for company with this description: (${companyDescription})`
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
    }

    const onCopyToClipboardClick = () => {
        navigator.clipboard.writeText(resultAdvertisement).then(r => console.log('text copied!'));
    }

    return (
        <>
            <div className="container py-3">
                <header>
                    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                        <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="me-2"
                                 viewBox="0 0 118 94" role="img"><title>Bootstrap</title>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                                      fill="currentColor"></path>
                            </svg>
                            <span className="fs-4">Pricing example</span>
                        </a>

                        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                            <a className="me-3 py-2 text-dark text-decoration-none" href="#">Features</a>
                            <a className="me-3 py-2 text-dark text-decoration-none" href="#">Enterprise</a>
                            <a className="me-3 py-2 text-dark text-decoration-none" href="#">Support</a>
                            <a className="py-2 text-dark text-decoration-none" href="#">Pricing</a>
                        </nav>
                    </div>

                    <div>
                        <div className="row gx-5 m-4">
                            <div className="col-4">
                                <div>
                                    <div>
                                        Language
                                    </div>
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
                                    <div>
                                        Tone
                                    </div>
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
                                    <div>
                                        Framework
                                    </div>
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
                                    <div>
                                        Company Description
                                    </div>
                                    <textarea onChange={onCompanyDescriptionChange} className="form-control" rows="4">
                    </textarea>
                                </div>
                                <div className="mt-5">
                                    <button onClick={onComposeClick} className="btn btn-primary w-100" disabled={isLoading}>
                                        {isLoading ?
                                            <>
                                    <span
                                        className="spinner-grow spinner-grow-sm mx-2"
                                        role="status"
                                        aria-hidden="true">
                                    </span>
                                                Loading...
                                            </>
                                            :
                                            <>
                                                Compose
                                            </>
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col">
                                        Advertisement
                                    </div>
                                    <div className="col text-end">
                            <span className="text-primary" style={{textDecoration: "underline", cursor: "pointer"}}>
                                Copy to Clipboard
                            </span>
                                    </div>
                                </div>
                                <textarea
                                    readOnly={true}
                                    value={resultAdvertisement}
                                    className="form-control"
                                    rows="20">
                    </textarea>
                            </div>
                        </div>
                    </div>

                    <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal">Pricing</h1>
                        <p className="fs-5 text-muted">Quickly build an effective pricing table for your potential
                            customers with this Bootstrap example. It’s built with default Bootstrap components and
                            utilities with little customization.</p>
                    </div>
                </header>

                <main>
                    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">Free</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$0<small
                                        className="text-muted fw-light">/mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>10 users included</li>
                                        <li>2 GB of storage</li>
                                        <li>Email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <button type="button" className="w-100 btn btn-lg btn-outline-primary">Sign up for
                                        free
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">Pro</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$15<small
                                        className="text-muted fw-light">/mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>20 users included</li>
                                        <li>10 GB of storage</li>
                                        <li>Priority email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <button type="button" className="w-100 btn btn-lg btn-primary">Get started</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm border-primary">
                                <div className="card-header py-3 text-bg-primary border-primary">
                                    <h4 className="my-0 fw-normal">Enterprise</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$29<small
                                        className="text-muted fw-light">/mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>30 users included</li>
                                        <li>15 GB of storage</li>
                                        <li>Phone and email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <button type="button" className="w-100 btn btn-lg btn-primary">Contact us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="pt-4 my-md-5 pt-md-5 border-top">
                    <div className="row">
                        <div className="col-6 col-md">
                            <h5>Features</h5>
                            <ul className="list-unstyled text-small">
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Cool
                                    stuff</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Random
                                    feature</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Team
                                    feature</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Stuff
                                    for developers</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Another
                                    one</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Last
                                    time</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Resources</h5>
                            <ul className="list-unstyled text-small">
                                <li className="mb-1"><a className="link-secondary text-decoration-none"
                                                        href="#">Resource</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Resource
                                    name</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Another
                                    resource</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Final
                                    resource</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>About</h5>
                            <ul className="list-unstyled text-small">
                                <li className="mb-1"><a className="link-secondary text-decoration-none"
                                                        href="#">Team</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none"
                                                        href="#">Locations</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none"
                                                        href="#">Privacy</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none"
                                                        href="#">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default App;
