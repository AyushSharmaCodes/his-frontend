import React, { useState } from "react";
import styles from "./CitizenData.module.css";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { Label } from "@/components/ui/Label";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type SectionStatus = "Pending" | "Complete";

interface CitizenInfo {
  applicationId: string;
  name: string;
  dob: string;
  contact: string;
  status: string;
  registrationDate: string;
  currentStatus: string;
}

const HomePage: React.FC = () => {
  const [citizen] = useState<CitizenInfo>({
    applicationId: "APP-2024-1001",
    name: "John Doe",
    dob: "1990-05-15",
    contact: "(123) 456-7890",
    status: "Active",
    registrationDate: "2024-08-01",
    currentStatus: "Pending DC",
  });

  const [sections, setSections] = useState<Record<string, SectionStatus>>({
    Household: "Complete",
    Income: "Pending",
    Health: "Pending",
    Documents: "Complete",
  });

  const navigate = useNavigate();

  const markComplete = (section: string) => {
    setSections((prev) => ({
      ...prev,
      [section]: "Complete",
    }));
    navigate("/user/data/citizen-data");
  };

  const allComplete = Object.values(sections).every((s) => s === "Complete");

  return (
    <div className={styles.container}>
      <hgroup className={styles.seachHeader}>
        <h1 className={styles.pageTitle}>Citizen Data</h1>

        {/* Search Section */}
        <div className={styles.searchBox}>
          <Input
            placeholder="Search by Application ID / Name / SSN"
            value={citizen.applicationId}
            className={styles.searchBar}
          />
          <Button type="button" className={styles.searchBtn}>
            <FaSearch size={22} />
          </Button>
        </div>
      </hgroup>

      <article className={styles.content}>
        {/* Citizen Info */}
        <section className={styles.citizenInfo}>
          <h2 className={styles.sectionTitle}>Citizen Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.field}>
              <Label>
                <strong>Name:</strong>
              </Label>
              <p>{citizen.name}</p>
            </div>
            <div className={styles.field}>
              <Label>
                <strong>DOB:</strong>
              </Label>
              <p>{citizen.dob}</p>
            </div>
            <div className={styles.field}>
              <Label>
                <strong>Contact:</strong>
              </Label>
              <p>{citizen.contact}</p>
            </div>
            <div className={styles.field}>
              <Label>
                <strong>Status:</strong>
              </Label>
              <p>{citizen.status}</p>
            </div>
          </div>
        </section>

        <section className={styles.citizenInfo}>
          <h2 className={styles.sectionTitle}>Application Summary</h2>
          <div className={styles.infoGrid}>
            <div className={styles.field}>
              <Label>
                <strong>Appliction ID:</strong>
              </Label>
              <p>{citizen.applicationId}</p>
            </div>
            <div className={styles.field}>
              <Label>
                <strong>Citizen Name:</strong>
              </Label>
              <p>{citizen.name}</p>
            </div>
            <div className={styles.field}>
              <Label>
                <strong>Registration Date:</strong>
              </Label>
              <p>{citizen.registrationDate}</p>
            </div>
            <div className={styles.field}>
              <Label>
                <strong>Current Status:</strong>
              </Label>
              <p>{citizen.currentStatus}</p>
            </div>
          </div>
        </section>

        {/* Data Collection Sections */}
        <div className={styles.sections}>
          <h2 className={styles.sectionTitle}>Data Collection Sections</h2>
          <div className={styles.cards}>
            {Object.keys(sections).map((section) => (
              <div key={section} className={styles.card}>
                <h3>{section} Information</h3>
                <p>
                  Status:{" "}
                  <span
                    className={`${styles.badge} ${
                      sections[section] === "Complete"
                        ? styles.complete
                        : styles.pending
                    }`}
                  >
                    {sections[section]}
                  </span>
                </p>
                <Button
                  type="button"
                  onClick={() => markComplete(section)}
                  className={styles.proceedBtn}
                  disabled={sections[section] === "Complete"}
                >
                  {sections[section] === "Complete" ? "Completed" : "Proceed"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <Button type="button" className={styles.saveBtn}>
          Save Progress
        </Button>
        <Button
          type="button"
          className={styles.submitBtn}
          disabled={!allComplete}
        >
          Submit for Eligibility
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
