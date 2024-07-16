import { MessageKeys, useTranslations } from "next-intl";
import { Messages } from "@/root/next-intl";

export function useResponseMessage() {
  const t = useTranslations();

  return function (message_code: string) {
    return t(
      `ResponseMessage.${message_code}` as MessageKeys<
        Messages,
        "ResponseMessage"
      >
    );
  };
}
