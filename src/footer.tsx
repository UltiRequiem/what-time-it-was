export const Footer = () => {
	const createdYear = 2022;

	const currentYear = new Date().getFullYear();

	const yearToShow = currentYear === createdYear
		? createdYear
		: `${createdYear} - ${currentYear}`;

	return <footer className="underline">© {yearToShow} Eliaz Bobadilla</footer>;
};
