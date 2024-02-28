export type Props = {
  id: string;
  title: string;
  notes?: string;
};

export default function ListItems({ title, notes }: Props) {
  return (
    <div>
      <h3>{title}</h3>
      {notes && <p>{notes}</p>}
      <div>
        <button>Edit</button>
        <button>Remove</button>
      </div>
    </div>
  );
}
