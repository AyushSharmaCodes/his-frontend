"use client";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./Calendar.module.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar(props: CalendarProps) {
  return <DayPicker className={styles.calendar} {...props} />;
}
