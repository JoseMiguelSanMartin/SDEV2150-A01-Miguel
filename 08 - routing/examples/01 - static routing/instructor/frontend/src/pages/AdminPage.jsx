// react hooks
import { useState } from 'react';

// our custom hooks
import { useResources } from '../hooks/useResources';

// our components
import Card from '../components/ui/Card';

export default function AdminPage() {

  const EXAMPLE_RESOURCE = {
    title: 'Study Group',
    category: 'Wellness',
    summary: 'Studying in a group (of people).',
    location: 'NAIT Campus',
    hours: 'Mon-Fri 08:00-13:00',
    virtual: false,
    openNow: false,
  }

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