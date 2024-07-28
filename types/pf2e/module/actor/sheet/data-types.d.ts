import type { ActorPF2e } from "../base.ts";
import type { TraitViewData } from "../data/base.ts";
import type { ActorSizePF2e } from "../data/size.ts";
import type { InventoryBulk } from "../inventory/index.ts";
import type { PhysicalItemPF2e } from "../../item/index.ts";
import type { Frequency } from "../../item/base/data/index.ts";
import type { Coins } from "../../item/physical/data.ts";
import type { RollOptionToggle } from "../../rules/synthetics.ts";
import type { SheetOptions } from "../../sheet/helpers.ts";
interface InventoryItem<TItem extends PhysicalItemPF2e = PhysicalItemPF2e> {
    item: TItem;
    /** Item size if it causes any weight difference relative to the actor */
    itemSize?: ActorSizePF2e | null;
    isContainer: boolean;
    canBeEquipped: boolean;
    /** Bulk for each item is shown on an individual basis from merchant sheets */
    unitBulk: string | null;
    isInvestable: boolean;
    isSellable: boolean;
    hasCharges: boolean;
    heldItems?: InventoryItem[];
    notifyInvestment?: boolean;
    /** Whether the item should be hidden if the user isn't the owner */
    hidden: boolean;
}
interface CoinDisplayData {
    value: number;
    label: string;
}
export type CoinageSummary = {
    [K in keyof Coins]?: CoinDisplayData;
};
interface SheetItemList {
    label: string;
    types: string[];
    items: InventoryItem[];
}
interface SheetInventory {
    sections: SheetItemList[];
    bulk: InventoryBulk;
    showValueAlways: boolean;
    showUnitBulkPrice: boolean;
    hasStowedWeapons: boolean;
    hasStowingContainers: boolean;
    invested?: {
        value: number;
        max: number;
    } | null;
}
interface ActorSheetDataPF2e<TActor extends ActorPF2e> extends ActorSheetData<TActor> {
    data: TActor["system"];
    canDistributeCoins?: {
        enabled: boolean;
    } | null;
    enrichedContent: Record<string, string>;
    inventory: SheetInventory;
    isLootSheet: boolean;
    isTargetFlatFooted: boolean;
    toggles: Record<string, RollOptionToggle[]>;
    totalCoinage: CoinageSummary;
    totalCoinageGold: string;
    totalWealth: Coins;
    totalWealthGold: string;
    traits: SheetOptions;
    user: {
        isGM: boolean;
    };
    publicationLicenses: FormSelectOption[];
}
interface AbilityViewData {
    _id: string;
    name: string;
    traits: TraitViewData[];
    glyph: string | null;
    frequency: Frequency | null;
    has: {
        aura: boolean;
        deathNote: boolean;
        selfEffect: boolean;
    };
}
interface ActorSheetRenderOptionsPF2e extends RenderOptions {
    /** What tab to switch to when rendering the sheet */
    tab?: string;
}
export type { AbilityViewData, ActorSheetDataPF2e, ActorSheetRenderOptionsPF2e, InventoryItem, SheetInventory };
