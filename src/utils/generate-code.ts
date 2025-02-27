import referralCodes from "referral-codes";

export const generateReferralCodes = () => {
  const referralCode = referralCodes.generate({
    length: 8,
    count: 1,
    charset: referralCodes.charset(referralCodes.Charset.ALPHANUMERIC),
    pattern: "##-###-##",
  });

  return referralCode;
};
