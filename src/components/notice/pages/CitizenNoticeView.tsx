import React, { useState } from "react";
import styles from "./CitizenNoticeView.module.css";
import Button from "@/components/ui/Button";

import { MdLocalPrintshop } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import NoticeSendSuccess from "./NoticeSendSuccess";
import NoticeSendFailure from "./NoticeSendFailure";

interface CitizenNoticeViewProps {
  title?: string;
  noticeHtml: string; // HTML string from backend
  onBack: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

const CitizenNoticeView: React.FC<CitizenNoticeViewProps> = ({
  title = "View Citizen Notice",
  noticeHtml,
  onBack,
  onPrint,
  onDownload,
}) => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const portalRoot = document.getElementById("overlay") as HTMLElement;

  const handleSend = () => {
    const success = Math.random() > 0.3; // 70% success chance
    if (success) {
      setSent(true);
      setTimeout(() => {
        navigate("/user/notice"); // Navigate to NoticeDashboard
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h2 className={styles.pageTitle}>{title}</h2>
        <div className={styles.actions}>
          <Button className={styles.actionBtn} onClick={onPrint}>
            <MdLocalPrintshop size={24} />
            Print
          </Button>
          <Button className={styles.actionBtn} onClick={onDownload}>
            <FaDownload size={18} />
            Download
          </Button>
          <Button
            className={styles.backBtn}
            onClick={onBack}
            to="/user/notice/generate"
          >
            ← Back to Notices
          </Button>
        </div>
      </header>

      {/* Notice body */}
      <div className={styles.noticeWrapper}>
        <div
          className={styles.noticeContent}
          dangerouslySetInnerHTML={{ __html: noticeHtml }}
        />
      </div>

      <div className={styles.formActions}>
        <Button className={styles.sendBtn} onClick={handleSend}>
          Send Notice
        </Button>
      </div>

      {/* Success overlay */}
      {sent && ReactDOM.createPortal(<NoticeSendSuccess />, portalRoot)}

      {/* Error overlay */}
      {error && ReactDOM.createPortal(<NoticeSendFailure />, portalRoot)}
    </div>
  );
};

export default CitizenNoticeView;
