
```
finance-app
├─ .dockerignore
├─ .npmrc
├─ .prettierrc
├─ AGENTS.md
├─ client
│  ├─ App.tsx
│  ├─ components
│  │  ├─ AddBudgetDialog.tsx
│  │  ├─ AddTransactionDialog.tsx
│  │  ├─ BudgetsList.tsx
│  │  ├─ CategoryCharts.tsx
│  │  ├─ ProtectedRoute.tsx
│  │  ├─ StatsCards.tsx
│  │  ├─ TransactionsList.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ constants
│  │  └─ categories.ts
│  ├─ context
│  │  └─ AuthContext.tsx
│  ├─ global.css
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  ├─ use-toast.ts
│  │  ├─ useAuth.ts
│  │  ├─ useBudgets.ts
│  │  ├─ useNotifications.ts
│  │  └─ useTransactions.ts
│  ├─ lib
│  │  ├─ utils.spec.ts
│  │  └─ utils.ts
│  ├─ pages
│  │  ├─ Auth.tsx
│  │  ├─ Budgeting.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ Index.tsx
│  │  ├─ NotFound.tsx
│  │  └─ Notifications.tsx
│  ├─ services
│  │  ├─ api.ts
│  │  ├─ authService.ts
│  │  ├─ budgetService.ts
│  │  ├─ notificationService.ts
│  │  └─ transactionService.ts
│  ├─ types
│  │  ├─ auth.ts
│  │  ├─ budget.ts
│  │  ├─ notification.ts
│  │  └─ transaction.ts
│  └─ vite-env.d.ts
├─ components.json
├─ index.html
├─ netlify
│  └─ functions
│     └─ api.ts
├─ netlify.toml
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ server
│  ├─ app.ts
│  ├─ config
│  │  └─ db.ts
│  ├─ controllers
│  │  ├─ auth.controller.ts
│  │  ├─ budget.controller.ts
│  │  ├─ notification.controller.ts
│  │  ├─ transaction.controller.ts
│  │  └─ user.controller.ts
│  ├─ index.ts
│  ├─ middlewares
│  │  └─ auth.middleware.ts
│  ├─ models
│  │  ├─ Budget.ts
│  │  ├─ Notification.ts
│  │  ├─ Transation.ts
│  │  └─ User.ts
│  ├─ node-build.ts
│  ├─ routes
│  │  ├─ auth.routes.ts
│  │  ├─ budget.routes.ts
│  │  ├─ demo.ts
│  │  ├─ notification.routes.ts
│  │  ├─ transaction.routes.ts
│  │  └─ user.routes.ts
│  ├─ start.ts
│  ├─ types
│  │  └─ express.d.ts
│  ├─ utils
│  │  └─ jwt.ts
│  └─ validators
│     └─ auth.validator.ts
├─ shared
│  └─ api.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.server.ts
└─ vite.config.ts

```