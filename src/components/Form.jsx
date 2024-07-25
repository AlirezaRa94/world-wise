import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import Messag from "./Message";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useURLPosition();
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a valid city! Click somewhere else on the map. 😉"
          );
        }

        setCityName(data.city || data.locality || "");
        setEmoji(convertToEmoji(data.countryCode || ""));
      } catch (err) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    if (!lat || !lng) return;

    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) {
    return <Spinner />;
  }

  if (geoCodingError) {
    return <Messag message={geoCodingError} />;
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City Name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <input
          id='date'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
