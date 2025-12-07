const { window } = globalThis;

const local = {
  clear: () => {
    const { sessionStorage } = window;
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("bearerToken");
    sessionStorage.clear();
  },
  getItem: (item_name: any) => {
    const { sessionStorage } = window;
    return sessionStorage.getItem(`SYNTH::${item_name}`);
  },
  setItem: (itemName: any, value: any) => {
    const { sessionStorage } = window;
    return sessionStorage.setItem(`SYNTH::${itemName}`, value);
  },
};

export default local;
