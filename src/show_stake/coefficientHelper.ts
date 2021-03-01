const coefficientHelper = {
  isString(t: unknown): boolean {
    return typeof t === 'string';
  },
  extParseFloat(e: string): number {
    const t = this.isString(e) && /\s/.test(e) ? e.split(' ').join('') : e;
    return t ? parseFloat(t) : 0;
  },
  totals(t: string): string {
    if (this.extParseFloat(t).toString() !== t) {
      if (!t || t === '' || t.indexOf(':') > -1 || t.indexOf(',') > -1)
        return t;
      const n = 100 * this.extParseFloat(t);
      return n % 100 === 0 || n % 50 === 0
        ? t
        : `${(n - 25) / 100}-${(n + 25) / 100}`;
    }
    return t.toString();
  },
  odds(e: string, t: string): string {
    if (e) {
      return e;
    }
    if (e !== '') {
      if (['0', '0.0'].indexOf(e) > -1) {
        return '0.0';
      }
      return t + e;
    }
    return '';
    // return e || e !== '' ? (['0', '0.0'].indexOf(e) > -1 ? '0.0' : t + e) : '';
  },
};

export default coefficientHelper;
