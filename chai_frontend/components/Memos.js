import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memoData = async () => {
      const memos = await contract.getSenders();
      setMemos(memos);
    };
    contract && memoData();
  }, [contract]);

  console.log(memos);
  return (
    <div>
      {memos.map((memo) => {
        return (

          <div className="flex flex-row justify-around border content-center">
            <div className="">{memo.name}</div>
            <div>{memo.message}</div>
            <div>{new Date(memo.timestamp *1000).toLocaleString()}</div>
            <div>{memo.bhagwan}</div>
          </div>

        );
      })}
    </div>
  );
};

export default Memos;
