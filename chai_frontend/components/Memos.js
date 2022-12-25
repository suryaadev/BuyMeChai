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
      <p>Messages</p>
      {memos.map((memo) => {
        return (
          <table key={memo.timestamp}>
            <tbody>
              <tr>
                {memo.name}
                <td>{memo.name}</td>
                <td>{memo.message}</td>
                <td>{String(memo.timestamp)}</td>
                <td>{memo.bhagwan}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default Memos;
