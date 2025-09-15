import React from "react";
import Button from "../../ui/Button";
import { Label } from "../../ui/Label";
import styles from "./PlanView.module.css";
import { MdDelete, MdOutlineEdit } from "react-icons/md";

const PlanView: React.FC = () => {
  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <div>
          <h1 className={styles.title}>Plan Details</h1>
          <p className={styles.subtitle}>Review the information of this plan</p>
        </div>
        <Button
          variant="primary"
          to="/admin/plans/{planId}/edit"
          className={styles["edit-button"]}
        >
          <MdOutlineEdit size={22} />
        </Button>
      </hgroup>

      <article className={styles.content}>
        {/* Basic Info */}
        <section className={styles.section}>
          <h3>Basic Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <Label>Plan Name</Label>
              <p>Health Plus</p>
            </div>
            <div className={styles.field}>
              <Label>Plan Code</Label>
              <p>HP-2024</p>
            </div>
            <div className={styles.field}>
              <Label>Plan Type</Label>
              <p>Health</p>
            </div>
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <Label>Description</Label>
              <p>
                Comprehensive healthcare plan covering general consultation,
                hospitalization, and maternity benefits.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className={styles.section}>
          <h3>Eligibility Requirements</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <Label>Minimum Age</Label>
              <p>18</p>
            </div>
            <div className={styles.field}>
              <Label>Maximum Age</Label>
              <p>65</p>
            </div>
            <div className={styles.field}>
              <Label>Income Limit ($)</Label>
              <p>75000</p>
            </div>
            <div className={styles.field}>
              <Label>Employment Status</Label>
              <p>Employed</p>
            </div>
          </div>
          <div className={styles.checkboxRow}>
            <Label>Must have Children:</Label>
            <span>No</span>
          </div>
        </section>

        {/* Financial Info */}
        <section className={styles.section}>
          <h3>Financial Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <Label>Monthly Benefit ($)</Label>
              <p>1200</p>
            </div>
            <div className={styles.field}>
              <Label>Premium Amount ($)</Label>
              <p>150</p>
            </div>
            <div className={styles.field}>
              <Label>Co-Pay Amount ($)</Label>
              <p>30</p>
            </div>
          </div>
        </section>

        {/* Lifecycle */}
        <section className={styles.section}>
          <h3>Plan Schedule & Status</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <Label>Start Date</Label>
              <p>2024-01-01</p>
            </div>
            <div className={styles.field}>
              <Label>End Date</Label>
              <p>2025-12-31</p>
            </div>
            <div className={styles.field}>
              <Label>Status</Label>
              <p>Active</p>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className={styles.section}>
          <h3>Required Documents</h3>
          <div className={styles.badges}>
            <span className={styles.badge}>Proof of Income</span>
            <span className={styles.badge}>ID Proof</span>
            <span className={styles.badge}>Residency Proof</span>
          </div>
        </section>

        {/* Delete Button */}
        <Button type="button" className={styles.deleteBtn}>
          <MdDelete size={22} />
          Delete Plan
        </Button>
      </article>
    </div>
  );
};

export default PlanView;
