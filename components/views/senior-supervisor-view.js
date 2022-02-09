function SeniorSupervisorView(props) {
  const { identity, supes, enums } = props;
  let iden;
  if (identity) {
    iden = JSON.parse(identity);
  }
  return (
    <div className='flex flex-col w-full'>
      {iden.map((id, index) => (
        <div className='grid ' key={index}>
          {id.docData.name}
        </div>
      ))}
    </div>
  );
}

export default SeniorSupervisorView;
