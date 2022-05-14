import { useEffect, useState } from "react";

import {
  fethText,
  getQuery,
  pushQuery,
  removeFromNow,
  timeZone,
} from "./utils";

import { LanguageSwitch } from "./LanguageSwitch";
import { TimeZoneSwitch } from "./TimeZoneSwitch";
import { HoursInput } from "./24HoursInput";

import { Language, SwitchInput } from "./types";

const hoursAgo = getQuery("hour");

export function App() {
  const [input, setInput] = useState(
    hoursAgo ? removeFromNow(hoursAgo) : removeFromNow()
  );

  const [language, setLanguage] = useState("English");

  const [hostTimeZone, setHostTimeZone] = useState(timeZone);

  const [languageList, setLanguageList] = useState<Array<Language["title"]>>();
  const [languageData, setLanguageData] = useState<Language>();

  async function fetchLanguages() {
    const data = await fethText();

    setLanguageData(data.find((lang) => lang.lang === language));
    setLanguageList(data.map((lang) => lang.lang));
  }

  useEffect(() => {
    void fetchLanguages();
  }, [language, setLanguage]);

  const onLanguageInput: SwitchInput = ({ currentTarget: { value } }) => {
    setLanguage(value);

    void fetchLanguages();
  };

  const hoursOnInput: SwitchInput = ({ currentTarget: { value } }) => {
    setInput(removeFromNow(value));
    pushQuery("hour", value);
  };

  const onTimeZoneInput: SwitchInput = ({ currentTarget: { value } }) => {
    setHostTimeZone(value);
  };

  if (!languageData || !languageList) {
    return <p>Loading...</p>;
  }

  return (
    <main className="bg-slate-600 flex flex-col p-5 h-screen gap-4 text-2xl text-center">
      <h1 className="underline bold title-case text-purple-800">
        {languageData.title}
      </h1>
      Which Time Zone?
      <TimeZoneSwitch handler={onTimeZoneInput} />
      <p>{input.toLocaleString("en-US", { timeZone: hostTimeZone })}</p>
      Timezone: {hostTimeZone}
      <HoursInput handler={hoursOnInput} />
      <LanguageSwitch handler={onLanguageInput} languageList={languageList} />
      <p className="text-xl text-gray-200">{languageData.body}</p>
      <footer className="text-cyan-500">Eliaz Bobadilla</footer>
    </main>
  );
}
