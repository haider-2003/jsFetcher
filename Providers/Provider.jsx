import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../config/queryClient";

export default function Provider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
