declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiWlb: any;

  interface Window {
    germesData: {
      doStakeTime: Date;
      betProcessingStep: string;
      betProcessingAdditionalInfo: string;
    };
  }
}

export default {};
