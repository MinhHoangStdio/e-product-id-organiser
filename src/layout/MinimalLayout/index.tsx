import RepurchaseModal from "../../components/modal/order/RepurchaseModal";

const MinimalLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="content">
    {children}
    <RepurchaseModal />
  </main>
);

export default MinimalLayout;
