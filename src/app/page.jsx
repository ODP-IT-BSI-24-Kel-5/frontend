import DashboardLayout from "../components/DashboardLayout";
import AccountsSection from "./_components/AccountsSection";
import AppPromotion from "./_components/AppPromotion";
import BalanceAndSpendingSection from "./_components/BalanceSpendingSection";
import ChartsSection from "./_components/ChartsSection";
import TransactionTable from "./_components/TransactionTable";
import WelcomeSection from "./_components/WelcomeSection";

export default function Home() {
    return (
        <DashboardLayout>
            <WelcomeSection name="Reynaldo" />
            <div className="divider h-fit mt-0"></div>
            <AccountsSection />
            <ChartsSection />
            <TransactionTable />
            <AppPromotion />
        </DashboardLayout>
    );
}
