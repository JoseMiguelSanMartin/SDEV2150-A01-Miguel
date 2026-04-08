import { getResources, getResourceById } from './api/resources';


// LOADERS ------------------------------------------------------------------------------
export async function resourceDirectoryLoader() {
  const resources = await getResources();
  return { resources };
}
  /* 
    whatever the named properties of the data items are -> what we'll be consuming
    by name in the components that use these loaders

    usage in component: 
      const data = useLoaderData();
      console.log(data.resources);
  */


// I'm using this for both 'admin/' and 'admin/:resourceId' cases
export async function adminLoader({ params }) {
  // a) I need all the resources for the list container.
  //      'params' (see function input) is a named input for loaders that
  //      we can extract URL params from.
  const resources = await getResources();

  if (!params.resourceId) {
    // here is the structure of the data I'm returning for this loader:
    return {
      resources,  // I don't need key: value if they're named the same
      resourceId: null,
      selectedResource: null,
    }
  }

  // b) I need an ID-specific fetch to prepopulate the form.
  const selectedResource = await getResourceById(params.resourceId)

  return {
    resources,
    resourceId: params.resourceId,
    selectedResource,
  };
}
/*
   In this case, we're objectively fetching the same data twice (the by-ID fetch gives us
   exactly the same object/data as its item in 'resources'), but this is meant to simulate
   a common pattern in REST API design where list-like API endpoints return item summaries and
   ID-specific / by-item results are more detailed (so we *would* be doing a separate ID-specific fetch).
*/


// ACTIONS ------------------------------------------------------------------------------
export async function AdminAction({ request, params }) {}