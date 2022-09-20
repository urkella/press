/**
 * RouteComponent is a component that returns the main page
 * component. It also calls loadData function that's connected
 * with each page, to avoid doing componentDidMount or useEffect
 * in every component that fetch an API on mount.
 */
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const callLoadData = (props) => {
  const { route, params, location, dispatch } = props;
  const { loadData } = route;

  const shouldLoadData = typeof loadData === "function";
  if (shouldLoadData) {
    loadData(params, location.search, dispatch);
  }
};

const RouteComponent = (props) => {
  const { route } = props;
  const params = useParams();
  const location = useLocation();
  const loadDataProps = { ...props, params, location };

  useEffect(() => {
    callLoadData(loadDataProps);
    // eslint-disable-next-line
  }, [location]);

  return route.component;
};

export default RouteComponent;
