// react hooks
import { useEffect, useState } from 'react';

// react-router hooks
import { useParams } from 'react-router';

// our custom hooks/components
import { useResources } from '../hooks/useResources';
import Card from '../components/ui/Card';


export default function AdminPage() {

  const [formData, setFormData] = useState({
    title: 'Study Group',
    category: 'Wellness',
    summary: 'Some summary of the resource.',
    location: 'NAIT Campus',
    hours: 'Mon-Fri 08:00-13:00',
    contact: 'study@nait.ca',
    virtual: false,
    openNow: false,
  });

  const { resources, addResource, isLoading, error, refetch } = useResources();
  
  const { resourceId } = useParams(); // not doing anything with this yet

  useEffect(
    () => {

      // console.log(resourceId)
      // console.log(resources)

      // 1. no resourceId -> I'm at /admin/ -> probably creating a new one
      if (!resourceId) {
        resetForm();
      }

      // 2. there is a resourceId -> grab the matching resource & prepop form
      //      if no matching resource -> do nothing
      const resource = resources.find((item) => item.id === resourceId);
      if (!resource) return; // leaving initial state here for demo purposes
      
      // console.log(resource)
      setFormData(resource);
    },
    
    [resourceId, resources] // this is required to get that matching
                            // -> on initial load, we don't have resources or resourceId
                            //    because they're derived from other effects (and this is all async
                            //    so we have no guarantee about the completion order)
  )

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      summary: '',
      location: '',
      hours: '',
      contact: '',
      virtual: false,
      openNow: false,
    })
  }

  async function handleCreateResource(e) {
    e.preventDefault();

    // Added as student exercise solution -- replaces inline fetch
    addResource(formData);
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      {isLoading && <p>Loading resources...</p>}

      {error && (
        <div className="alert alert-error">
          <span>{error.message}</span>
          <button className="btn btn-sm" onClick={refetch}>Try again</button>
        </div>
      )}

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Resource Form">
          <div className="card-body">
            <form onSubmit={handleCreateResource} id="frm-add-resource" className="space-y-4">

              <div className="space-y-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: event.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: event.target.value})}
                >
                  {['Academic', 'Wellness', 'Financial', 'Tech'].map(
                    (label) => { 
                      return <option value={label}>{label}</option>
                    }
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: event.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                  Hours
                </label>
                <input
                  id="hours"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource hours (e.g. Mon-Fri 08:00-13:00)"
                  value={formData.hours}
                  onChange={(e) => setFormData({...formData, hours: event.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  id="contact"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource contact (e.g. email@nait.ca)"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: event.target.value})}
                />
              </div>

              <div className="flex gap-6">
                <div className="space-y-1">
                  <label htmlFor="virtual" className="block text-sm font-medium text-gray-700">
                    Virtual (online-only)
                  </label>
                  <input
                    id="virtual"
                    type="checkbox"
                    className="rounded border border-gray-300 text-sm"
                    checked={formData.virtual}
                    onChange={(e) => setFormData({...formData, virtual: event.target.checked})}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="open-now" className="block text-sm font-medium text-gray-700">
                    Open Now
                  </label>
                  <input
                    id="open-now"
                    type="checkbox"
                    className="rounded border border-gray-300 text-sm"
                    checked={formData.openNow}
                    onChange={(e) => setFormData({...formData, openNow: event.target.checked})}
                  />
                </div>
              </div>  

              <hr className="border-gray-200" />

              <div className="flex gap-2">
                <button
                  type="reset"
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  onClick={resetForm}
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
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.id} className="rounded border border-gray-200 p-3 ">
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
};