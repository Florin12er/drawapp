import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false); // set the initial state to false

    const apiMutation = useMutation(mutationFunction); // use the useMutation hook

    const mutate = async (payload: any) => {
        // define the mutate function
        setPending(true); // set the state to true
        return apiMutation(payload) // call the useMutation hook
            .finally(() => setPending(false)) // set the state to false
            .then((result) => {
                // return the result
                return result;
            })
            .catch((error) => {
                // check for errors and throw them
                throw error;
            });
    };

    return { mutate, pending }; // and finally return the mutate function
};
