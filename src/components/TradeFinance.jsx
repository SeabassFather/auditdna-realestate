import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
export default function TradeFinance() {
  const { t } = useLanguage();
  // ...rest of your TradeFinance UI, replace labels with t("finance.amount"), etc.
}

