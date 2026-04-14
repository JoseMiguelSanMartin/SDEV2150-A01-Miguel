import { useLoaderData, useNavigate, NavLink } from 'react-router';

import { useResources } from '../hooks/useResources';
import Card from '../components/ui/Card';
import ResourceForm from '../components/ResourceForm';

// Now that the form has been moved into its own component, we can define a constant
// for the default form data.
const EMPTY_FORM_DATA = {
  title: '',
  category: '',
  summary: '',
  location: '',
  hours: '',
  contact: '',
  virtual: false,
  openNow: false,
};

export default function AdminPage() {
  const navigate = useNavigate();
  // navigation object stores / lets us track submission state when we get to react-router <Form />
  const isSubmitting = navigation.state === 'submitting';

  const { resources, resourceId, setSelectedResource } = useLoaderData();

  const currentResource = resourceId
    ? resources.find((item) => item.id === resourceId)
    : null;

  // Set the initial form data based on the current resource. If it's not null, use 
  // the resource's data. Otherwise, use the empty form data.
  const initialFormData = currentResource ? {
    title: currentResource.title,
    category: currentResource.category,
    summary: currentResource.summary,
    location: currentResource.location,
    hours: currentResource.hours,
    contact: currentResource.contact,
    virtual: currentResource.virtual,
    openNow: currentResource.openNow,
  } : EMPTY_FORM_DATA;

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

            {/* Update to make use of the ResourceForm component */}
            {(!resourceId || currentResource) && (
              <ResourceForm
                key={resourceId ?? 'new'}
                initialData={initialFormData}
                isEditing={Boolean(resourceId)}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </Card>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                >
                  <NavLink
                    to={`/admin/${resource.id}`}
                    className={({ isActive }) =>
                      `block rounded border p-3 ${isActive ? 'border-sky-500 bg-sky-50' : 'border-gray-200'}`
                    }
                  >
                    <p className="font-semibold">{resource.title}</p>
                    <p className="text-sm text-base-content/70">{resource.category}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
};