interface Props {
  label: string;
  source: string;
}

const Page: React.FC<Props> = ({ label, source }) => {
  return <div className="basemap-list-header">
    <a href={source} target="_blank" rel="noreferrer">{label}</a>
  </div>;
};

export default Page;
