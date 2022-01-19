import { collection, getDocs, query } from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import styles from "../styles/Index.module.css";

const Index: NextPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [traits, setTraits] = useState<Array<string>>([]);
  const [checked, setChecked] = useState<Array<number>>([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setSubmitted(false);
    setTraits([]);
    setChecked([]);

    const fetchTraits = async () => {
      const querySnapshot = await getDocs(query(collection(db, "traits")));
      querySnapshot.forEach((doc) => {
        setTraits((prevTraits) => [...prevTraits, doc.data().trait]);
      });
    };

    fetchTraits();
  }, []);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prevChecked) => [...prevChecked, parseInt(e.target.id)]);
  };

  const handleSubmit = () => {
    setSubmitted(true);

    const percent = parseInt(
      ((checked.length / traits.length) * 100).toFixed(2)
    );

    const possibleAnswers = [
      "You can come into my coffee shop. You're invited, even.",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "No, you cannot come into my coffee shop. How dare you assume you could even walk on the ground my coffee shop rests on. I am convinced you are a social experiment and not a true human being. I'll keep you in my prayers.'Thank you' for participating.",
    ];

    if (percent === 0) {
      setAnswer(possibleAnswers[0]);
    } else if (percent === 100) {
      setAnswer(possibleAnswers[11]);
    } else {
      setAnswer(possibleAnswers[Math.ceil(percent / 10)]);
    }
  };

  return (
    <>
      <Head>
        <title>Mocha</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1 className={styles.header}>Could you come into my coffee shop?</h1>
      {submitted ? (
        <>
          <p>
            Your score: {((checked.length / traits.length) * 100).toFixed(2)}%
          </p>
          <p>{answer}</p>
        </>
      ) : (
        <div className={styles.traits}>
          {traits.map((trait, i) => (
            <div className={styles.trait} key={i}>
              <label>
                {trait + " "}
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  id={i.toString()}
                  onChange={handleCheck}
                />
              </label>
              <br />
            </div>
          ))}
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </>
  );
};

export default Index;
