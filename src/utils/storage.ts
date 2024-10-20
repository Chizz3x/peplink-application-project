const Storage = (type: "local" | "session" = "local") => {
	if(typeof window === "undefined") return undefined;
	return type === "local" ? localStorage : type === "session" ? sessionStorage : undefined;
};

export { Storage };