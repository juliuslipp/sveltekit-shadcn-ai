import autosize from "autosize";

const autosizeAction = (node: HTMLElement) => {
  autosize(node);

  return {
    destroy() {
      autosize.destroy(node);
    },
  };
};

autosizeAction.update = autosize.update;
autosizeAction.destroy = autosize.destroy;

export { autosizeAction };
