import { useProjectsValue } from "../context/projects-context";

export const ProjectOverlay = ({setProject, showProjectOverlay, setShowProjectOverlay}) => {
  const { projects } = useProjectsValue();

  return (
    projects && showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map(project => (
            <li
              key={project.projectId}
              data-testid="project-overlay-action"
              className="project-overlay__list-item"
              onClick={() => {
                setProject(project.projectId);
                setShowProjectOverlay(false);
              }
            }>
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}