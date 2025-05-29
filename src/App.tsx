import { useState } from "react";

interface Course {
  id: number;
  nama: string;
  sks: number;
  grade: number;
}

function App() {
  const [data, setData] = useState<Course[]>([]);
  const [value, setValue] = useState(0);
  const [sksTotal, setSksTotal] = useState(0);

  const handleSetTopics = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData = {
      id: data?.length,
      nama: formData.get("mataKuliah") as string,
      sks: parseInt(formData.get("sks") as string) || 0,
      grade: parseInt(formData.get("grade") as string),
    };
    const updatedData = data ? [...data, newData] : [newData];
    const sks = parseInt(formData.get("sks") as string) || 0;
    const grade = parseInt(formData.get("grade") as string) || 0;
    setData(updatedData);
    setSksTotal((prevSksTotal) => prevSksTotal + sks);
    setValue((prevValue) => prevValue + sks * grade);
  };

  const handleDelete = (id: number) => {
    data?.forEach((item) => {
      if (item.id == id) {
        setValue(value - item.grade * item.sks);
        setSksTotal(sksTotal - Number.parseInt(item.sks.toString()));
      }
    });
    const dataNew = data?.filter((item) => item.id != id);
    setData(dataNew);
  };

  const handleReset = () => {
    setData([]);
    setSksTotal(0)
    setValue(0)
  };

  return (
    <>
      <header className="flex justify-center items-center">
        <h1 className="text-4xl font-bold">Kalkulator IP / IPK</h1>
      </header>
      <main className="container p-4 min-h-[90vh] overflow-y-scroll">
        <form
          method="post"
          onSubmit={handleSetTopics}
          className="p-4 border rounded-t-xl w-full box-shadow-lg"
        >
          <div className="form-group">
            <label htmlFor="matkul">Mata Kuliah</label>
            <input
              type="text"
              name="mataKuliah"
              id="matkul"
              className="p-2 rounded-full"
              placeholder="Komputer Grafis"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sks">Jumlah SKS</label>
            <input
              type="number"
              name="sks"
              id="sks"
              className="p-2"
              placeholder="3"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <select name="grade" id="grade" className="text-left p-2" required>
              <option value="0">- Pilih Grade -</option>
              <option value="4">A</option>
              <option value="3">B</option>
              <option value="2">C</option>
              <option value="1">D</option>
              <option value="0">E</option>
            </select>
          </div>
          <div className="form-group mt-4 mb-0">
            <button type="submit" className="btn bg-gray-500 text-white p-3">
              Add
            </button>
            <button type="reset" onClick={handleReset} className="btn bg-red-600 text-white p-3">
              Reset
            </button>
          </div>
        </form>
        <div className="h-[46vh] border p-4 overflow-y-scroll box-shadow-lg">
          <ul>
            {data.length > 0 &&
              data.map((item, index) => (
                <li key={index} className="flex justify-between p-2 border-b">
                  <span>
                    <b>{index + 1}.</b> {item.nama}
                  </span>{" "}
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-between">
            <span>
              IP / IPK :{" "}
              {value != 0 && sksTotal != 0 ? (
                <span
                  className={
                    Number.parseFloat((value / sksTotal).toString()) < 3.25
                      ? "text-red-500 font-bold line-through "
                      : "text-black font-bold"
                  }
                >
                  {Number.parseFloat((value / sksTotal).toString()).toPrecision(
                    3
                  )}
                </span>
              ) : (
                0
              )}
            </span>
            <span>
              Total Nilai : {value == 0 ? 0 : value} Total Sks :{" "}
              {sksTotal != 0 ? sksTotal : 0} Sks
            </span>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center">
        &copy; {new Date().getFullYear()} - GalaxyBuilder-Oss
      </footer>
    </>
  );
}

export default App;
