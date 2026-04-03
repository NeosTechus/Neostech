import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, PieChart, Pie, Cell } from "recharts";
import { DollarSign, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp } from "lucide-react";

type ProjectFinancial = {
  id: string;
  name: string;
  client: string;
  phase: string;
  start: string;
  end: string;
  budget: number;
  spent: number;
};

const DEFAULT_PROJECTS: ProjectFinancial[] = [
  {
    id: "p1",
    name: "Project A",
    client: "",
    phase: "Discovery",
    start: "",
    end: "",
    budget: 0,
    spent: 0,
  },
];

const financeChartConfig: ChartConfig = {
  budget: {
    label: "Remaining",
    color: "hsl(var(--chart-1))",
  },
  spent: {
    label: "Spent",
    color: "hsl(var(--chart-2))",
  },
};

export default function Finance() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    DEFAULT_PROJECTS[0]?.id ?? "",
  );
  const [projects, setProjects] = useState<ProjectFinancial[]>(DEFAULT_PROJECTS);

  const totals = useMemo(() => {
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
    const remaining = totalBudget - totalSpent;

    return {
      totalBudget,
      totalSpent,
      remaining,
      margin: totalBudget > 0 ? (remaining / totalBudget) * 100 : 0,
    };
  }, [projects]);

  const selectedProject = useMemo(() => {
    if (!projects.length) return undefined;
    return (
      projects.find((p) => p.id === selectedProjectId) ?? projects[0]
    );
  }, [projects, selectedProjectId]);

  const handleProjectFieldChange = (
    id: string,
    field: keyof ProjectFinancial,
    value: string,
  ) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,
              [field]:
                field === "budget" || field === "spent"
                  ? Number(value) || 0
                  : value,
            }
          : project,
      ),
    );
  };

  const handleAddProject = () => {
    const nextIndex = projects.length + 1;
    const newId = `p${nextIndex}-${Date.now()}`;

    setProjects((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
        client: "",
        phase: "",
        start: "",
        end: "",
        budget: 0,
        spent: 0,
      },
    ]);
    setSelectedProjectId(newId);
  };

  const selectedProjectRemaining = selectedProject
    ? Math.max(0, selectedProject.budget - selectedProject.spent)
    : 0;

  const selectedProjectUsage =
    selectedProject && selectedProject.budget > 0
      ? Math.min(100, (selectedProject.spent / selectedProject.budget) * 100)
      : 0;

  const budgetPieData =
    selectedProject && selectedProject.budget + selectedProject.spent > 0
      ? [
          {
            name: "Spent",
            value: selectedProject.spent,
            fill: "var(--color-spent)",
          },
          {
            name: "Remaining",
            value: selectedProjectRemaining,
            fill: "var(--color-budget)",
          },
        ]
      : [
          { name: "Spent", value: 0, fill: "var(--color-spent)" },
          { name: "Remaining", value: 1, fill: "var(--color-budget)" },
        ];

  const usageStatus =
    !selectedProject || selectedProject.budget <= 0
      ? "add budget and spend to see analysis"
      : selectedProjectUsage < 60
        ? "comfortably under budget"
        : selectedProjectUsage < 90
          ? "on track"
          : "at risk of going over budget";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Finance</h2>
          <p className="text-muted-foreground">
            Enter project name, phase, budget and spent. Remaining and the pie chart update automatically.
          </p>
        </div>
        <Badge
          variant="outline"
          className="flex items-center gap-1 bg-emerald-500/5 text-emerald-500 border-emerald-500/40"
        >
          <TrendingUp className="h-3 w-3" />
          Live from your inputs
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total project budget
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totals.totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total spent
            </CardTitle>
            <div className="p-2 rounded-lg bg-destructive/10">
              <PieChartIcon className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totals.totalSpent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {totals.totalBudget > 0
                ? `${((totals.totalSpent / totals.totalBudget) * 100).toFixed(1)}% of total budget`
                : "—"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Remaining
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <LineChartIcon className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totals.remaining.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {totals.totalBudget > 0
                ? `${totals.margin.toFixed(1)}% margin remaining`
                : "—"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projects
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">In this list</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Projects &amp; finances</CardTitle>
          <p className="text-xs text-muted-foreground">
            Remaining = budget minus spent (shown per row).
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 text-[11px] text-muted-foreground uppercase tracking-wide">
            <span>Project name</span>
            <span>Phase</span>
            <span>Budget</span>
            <span>Spent</span>
          </div>
          {projects.map((project) => {
            const remaining = Math.max(0, project.budget - project.spent);

            return (
              <div
                key={project.id}
                className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr]"
              >
                <div className="space-y-1">
                  <Input
                    value={project.name}
                    onChange={(e) =>
                      handleProjectFieldChange(project.id, "name", e.target.value)
                    }
                    placeholder="Project name"
                  />
                  <p className="text-[11px] text-muted-foreground md:hidden">
                    Remaining: ${remaining.toLocaleString()}
                  </p>
                </div>
                <Input
                  value={project.phase}
                  onChange={(e) =>
                    handleProjectFieldChange(project.id, "phase", e.target.value)
                  }
                  placeholder="Phase (e.g. Discovery, Dev)"
                />
                <Input
                  type="number"
                  min={0}
                  value={project.budget || ""}
                  onChange={(e) =>
                    handleProjectFieldChange(project.id, "budget", e.target.value)
                  }
                  placeholder="0"
                />
                <div className="space-y-1">
                  <Input
                    type="number"
                    min={0}
                    value={project.spent || ""}
                    onChange={(e) =>
                      handleProjectFieldChange(project.id, "spent", e.target.value)
                    }
                    placeholder="0"
                  />
                  <p className="hidden text-[11px] text-muted-foreground md:block">
                    Remaining: ${remaining.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
          <Button type="button" variant="outline" size="sm" onClick={handleAddProject}>
            Add project
          </Button>
        </CardContent>
      </Card>

      {selectedProject && (
        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle>Budget breakdown (pie)</CardTitle>
              <p className="text-xs text-muted-foreground">
                Spent vs remaining for the selected project.
              </p>
            </div>
            <div className="w-full sm:w-56">
              <Select
                value={selectedProject.id}
                onValueChange={setSelectedProjectId}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name || "Untitled project"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
            <ChartContainer config={financeChartConfig} className="aspect-square max-w-sm mx-auto md:mx-0">
              <PieChart>
                <Pie
                  data={budgetPieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  strokeWidth={2}
                >
                  {budgetPieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name) => [
                    `$${Number(value).toLocaleString()}`,
                    name,
                  ]}
                />
              </PieChart>
            </ChartContainer>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <p className="font-medium">
                  {selectedProject.name || "Untitled project"}
                </p>
                {selectedProject.phase && (
                  <p className="text-muted-foreground">Phase: {selectedProject.phase}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[11px] uppercase tracking-wide">
                    Budget
                  </p>
                  <p className="font-semibold">
                    ${selectedProject.budget.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[11px] uppercase tracking-wide">
                    Spent
                  </p>
                  <p className="font-semibold">
                    ${selectedProject.spent.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[11px] uppercase tracking-wide">
                    Remaining
                  </p>
                  <p className="font-semibold">
                    ${selectedProjectRemaining.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-[11px] uppercase tracking-wide">
                    Used
                  </p>
                  <p className="font-semibold">
                    {selectedProject.budget > 0
                      ? `${selectedProjectUsage.toFixed(1)}%`
                      : "—"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Status:{" "}
                <span className="font-medium text-foreground">{usageStatus}</span>
                {selectedProject.budget > 0 && (
                  <>
                    {" "}
                    —{" "}
                    <span className="font-medium text-foreground">
                      ${selectedProjectRemaining.toLocaleString()}
                    </span>{" "}
                    left in budget.
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
