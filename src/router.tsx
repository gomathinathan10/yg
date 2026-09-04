import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { RoutePending } from "./components/site/RoutePending";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    // Start fetching the route instantly as soon as a finger/pointer touches or hovers the link
    defaultPreloadDelay: 0,
    defaultPreloadStaleTime: 60_000,
    // Do not show an intrusive loading skeleton for instant local transitions
    defaultPendingMs: 4000,
    defaultPendingMinMs: 0,
  });

  return router;
};
