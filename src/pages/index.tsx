import { collection, getDocs, query } from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import styles from "../styles/Index.module.css";

const Index: NextPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [traits, setTraits] = useState<Array<string>>([]);
  const [checked, setChecked] = useState<Array<number>>([]);

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

  const handleCheck = (e: any) => {
    setChecked((prevChecked) => [...prevChecked, e.target.id]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <>
      <h1 className={styles.header}>Hello World</h1>
      <br />
      {submitted ? (
        <>
          <h1>Submitted</h1>
          {checked.map((check) => (
            <p key={check}>{traits[check]}</p>
          ))}
        </>
      ) : (
        <div>
          {traits.map((trait, i) => (
            <div key={i}>
              <label>{trait}</label>{" "}
              <input type="checkbox" id={i.toString()} onChange={handleCheck} />
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
