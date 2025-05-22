

export default async function Base() {


  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">My Application</h1>
      </header>
      <main className="flex-grow p-4">
        {/* Main content goes here */}
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <p>&copy; 2023 My Application</p>
      </footer>
    </div>
  );
}