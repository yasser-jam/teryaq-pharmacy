'use client'
import { SingleDatepicker } from "chakra-dayzed-datepicker";

import { useState } from "react";

interface BaseDatepickerProps {
    date: Date;
    setDate: (date: Date) => void;
}

export default function BaseDatepicker({ date, setDate }: BaseDatepickerProps) {
    
    return <SingleDatepicker
      name="date-input"
      date={date}
      onDateChange={(date: Date) => setDate(date)}
    />
}