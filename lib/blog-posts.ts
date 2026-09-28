export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  cover: string;
  content: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-cpo",
    title: "共同封裝光學（CPO）是什麼？從封裝層級理解下一代光電互連",
    excerpt:
      "當交換器頻寬持續攀升，傳統可插拔光模組正逼近功耗與空間的物理極限。CPO 從封裝層級重新設計光電互連方式，本文帶你了解它的基本原理與技術脈絡。",
    date: "2026-08-12",
    readTime: "6 分鐘",
    tags: ["技術原理", "封裝", "光通訊"],
    cover: "/images/hero-cpo.svg",
    content: [
      {
        type: "paragraph",
        text: "隨著 AI 訓練叢集與資料中心交換器的頻寬需求快速攀升，傳統將光模組安裝在機箱前面板、再透過 PCB 走線連接交換器 ASIC 的架構，正逐漸逼近功耗與空間密度的物理極限。Co-Packaged Optics（共同封裝光學，簡稱 CPO）正是為了突破這個瓶頸而發展的封裝技術。",
      },
      {
        type: "heading",
        text: "從「插拔模組」到「共同封裝」",
      },
      {
        type: "paragraph",
        text: "在傳統架構中，光模組（如 QSFP-DD、OSFP）位於機箱前面板，訊號需要先從交換器 ASIC 透過 PCB 走線一路傳到面板，再經由連接器進入光模組完成電光轉換。這段電氣路徑越長，訊號衰減與所需的驅動、均衡電路功耗就越高。",
      },
      {
        type: "paragraph",
        text: "CPO 的核心概念，是把光引擎（Optical Engine）直接與交換器 ASIC 封裝在同一個基板或中介層（interposer）上。電氣訊號不再需要長途跋涉到前面板，而是在基板內以毫米級距離完成傳輸，大幅降低訊號衰減與功耗開銷。",
      },
      {
        type: "heading",
        text: "為什麼現在是關鍵時刻",
      },
      {
        type: "list",
        items: [
          "AI 叢集對頻寬與延遲的要求，讓傳統可插拔模組的功耗占比越來越顯著",
          "單埠速率持續朝 800G、1.6T 甚至更高規格推進，前面板的實體空間已趨近極限",
          "先進封裝技術（如矽中介層、扇出封裝）逐漸成熟，讓光電共封裝在量產上更具可行性",
        ],
      },
      {
        type: "paragraph",
        text: "當然，CPO 也帶來新的挑戰，例如共封裝結構下的散熱設計、光引擎的可維修性與良率管理。這些議題也是目前業界研發的重點方向，我們會在後續文章中進一步討論。",
      },
    ],
  },
  {
    slug: "cpo-vs-pluggable-optics",
    title: "CPO 對決可插拔光模組：功耗、頻寬密度與維護性全面比較",
    excerpt:
      "CPO 並非要立即取代所有可插拔光模組，兩者在功耗效率、頻寬密度與系統維護彈性上各有優劣。本文用四個面向拆解兩種架構的取捨。",
    date: "2026-08-26",
    readTime: "7 分鐘",
    tags: ["架構比較", "功耗", "系統設計"],
    cover: "/images/co-packaged-optics.svg",
    content: [
      {
        type: "paragraph",
        text: "可插拔光模組（Pluggable Optics）長期以來是資料中心互連的主流方案，原因很簡單：它易於更換、方便維護，且與現有機箱設計相容。但隨著單埠速率邁向 800G、1.6T，這個架構也開始暴露出一些結構性限制。",
      },
      {
        type: "heading",
        text: "功耗：電氣路徑長度決定天花板",
      },
      {
        type: "paragraph",
        text: "可插拔模組的訊號必須從 ASIC 走過整片 PCB 才能抵達前面板，路徑越長，驅動與均衡電路消耗的功率就越高。CPO 把光引擎搬到 ASIC 旁邊，電氣路徑縮短至毫米等級，理論上能明顯降低每位元傳輸所需的能量。",
      },
      {
        type: "heading",
        text: "頻寬密度：前面板空間是硬限制",
      },
      {
        type: "paragraph",
        text: "前面板的實體面積有限，能容納的模組數量與埠密度存在天花板。CPO 透過封裝層級整合更多光通道，讓單位面積能提供的頻寬大幅提升，這對於持續追求更高埠數的核心交換器尤其重要。",
      },
      {
        type: "heading",
        text: "維護性：可插拔模組的優勢所在",
      },
      {
        type: "paragraph",
        text: "可插拔模組最大的優勢在於故障時可以直接更換，不需要停機拆解主機板。CPO 由於光引擎與 ASIC 共同封裝，一旦光學元件故障，維修複雜度與成本會顯著提高，這也是目前業界在良率與可靠度設計上持續投入的原因。",
      },
      {
        type: "heading",
        text: "現實選擇：漸進式導入",
      },
      {
        type: "list",
        items: [
          "短期內，可插拔模組仍會是中低速率、對維護彈性要求高的場景主流",
          "CPO 優先導入於極高頻寬密度需求的核心交換器與 AI 叢集節點互連",
          "兩種架構可能在同一個資料中心內並存，依應用場景分層採用",
        ],
      },
      {
        type: "paragraph",
        text: "CPO 與可插拔光模組並非互斥的競爭關係，而更像是一組工程取捨：在功耗與頻寬密度優先的場景選擇 CPO，在維護彈性優先的場景則繼續採用可插拔模組。",
      },
    ],
  },
  {
    slug: "cpo-in-ai-datacenters",
    title: "CPO 在 AI 資料中心的應用場景與未來展望",
    excerpt:
      "從 GPU 叢集互連到次世代交換器架構，CPO 正被視為支撐 AI 運算基礎設施持續擴展的關鍵技術之一。本文整理目前最受關注的應用場景與後續發展方向。",
    date: "2026-09-09",
    readTime: "6 分鐘",
    tags: ["AI 資料中心", "應用場景", "產業趨勢"],
    cover: "/images/ai-cluster-nodes.svg",
    content: [
      {
        type: "paragraph",
        text: "大型語言模型與生成式 AI 的訓練規模持續擴大，數千甚至數萬顆 GPU 需要以極高頻寬、低延遲的方式互連，才能讓平行運算的效率不被網路瓶頸拖累。這正是 CPO 技術受到高度關注的核心原因之一。",
      },
      {
        type: "heading",
        text: "AI 訓練與推論叢集",
      },
      {
        type: "paragraph",
        text: "在大規模 GPU 叢集中，節點之間的通訊頻寬直接影響訓練效率。CPO 透過降低每位元傳輸功耗與提升頻寬密度，有機會在相同的機櫃功耗預算下，支援更高速率的節點互連，間接提升整體運算資源的使用效率。",
      },
      {
        type: "heading",
        text: "次世代核心交換器",
      },
      {
        type: "paragraph",
        text: "資料中心的核心交換器持續朝更高埠數、更高單埠速率發展。當傳統可插拔模組的前面板空間逼近極限，CPO 提供了一條在封裝層級擴充頻寬密度的路徑，是支撐 800G、1.6T 世代交換器的關鍵技術方向之一。",
      },
      {
        type: "heading",
        text: "高效能運算（HPC）",
      },
      {
        type: "paragraph",
        text: "超級電腦節點間的互連同樣對頻寬與功耗高度敏感，與 AI 叢集面臨相似的挑戰。CPO 架構可望作為現有互連方案的補充或替代選項，特別是在功耗與散熱預算受限的高密度運算環境中。",
      },
      {
        type: "heading",
        text: "未來展望",
      },
      {
        type: "list",
        items: [
          "封裝與散熱設計持續演進，以因應共封裝結構下更集中的熱點",
          "光引擎的良率與可靠度是決定量產成本的關鍵變數",
          "標準化與供應鏈成熟度，將影響 CPO 從先進應用走向主流採用的速度",
        ],
      },
      {
        type: "paragraph",
        text: "整體而言，CPO 不會在一夜之間取代現有架構，但隨著 AI 基礎設施對頻寬與能源效率的要求持續提高，它已成為業界因應下一階段挑戰的重要技術路線之一，值得持續關注後續的量產進展。",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
