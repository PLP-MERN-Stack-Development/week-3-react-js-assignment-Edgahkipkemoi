export default function Card({ title, content }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <p>{content}</p>
    </div>
  );
}
