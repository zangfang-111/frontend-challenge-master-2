const swedishNumberFormat = new Intl.NumberFormat("sv-SE");
function withThousandSeparator(value: number):string {
  return swedishNumberFormat.format(value);
}

export default withThousandSeparator