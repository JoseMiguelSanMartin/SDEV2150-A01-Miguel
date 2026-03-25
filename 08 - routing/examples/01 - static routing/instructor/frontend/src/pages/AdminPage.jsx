// react hooks
import { useState } from 'react';

// our custom hooks
import { useResources } from '../hooks/useResources';

// our components
import Card from '../components/ui/Card';


const EXAMPLE_RESOURCE = {
  title: 'Study Group',
  category: 'Wellness',
  summary: 'Studying in a group (of people).',
  location: 'NAIT Campus',
  hours: 'Mon-Fri 08:00-13:00',
  virtual: false,
  openNow: false,
}

const EMPTY_RESOURCE = {
  title: '',
  category: '',
  summary: '',
  location: '',
  hours: '',
  contact: '',
  virtual: false,
  openNow: false,
}


export default function AdminPage() {

  const { resources, isLoading, error, refetch } = useResources();

  const [formData, setFormData] = useState(EXAMPLE_RESOURCE)

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Resource Form">
          <div className="card-body">
            <form id="frm-add-resource" className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="q" className="block text-sm font-medium text-gray-700">
                  Search
                </label>
                <input
                  id="q"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource title"
                />
              </div>

              <hr className="border-gray-200" />

              <div className="flex gap-2">
                <button
                  type="reset"
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  onClick={() => setFormData(EMPTY_RESOURCE)}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </Card>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            {isLoading && <p>Loading resources...</p>}

            {error && (
              <div className="alert alert-error">
                <span>{error.message}</span>
                <button className="btn btn-sm" onClick={refetch}>Try again</button>
              </div>
            )}
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.id} className="rounded border border-gray-200 p-3">
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
}