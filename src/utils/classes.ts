const classes = (...args: (string | null | undefined)[]) => {
	return args.map(m => m?.trim()).filter(Boolean).join(" ");
};

export { classes };