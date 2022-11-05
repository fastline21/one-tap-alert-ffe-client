import LoadingGIF from 'Assets/Images/loading.gif';

const Loading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img alt='' src={LoadingGIF} style={{ width: 200, height: 200 }} />
    </div>
  );
};

export default Loading;
