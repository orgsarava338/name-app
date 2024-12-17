export async function handleError(error: Error) {
  console.log(error);
  return { error: error.message };
}
