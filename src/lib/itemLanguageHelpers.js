import { Fragment } from "react";

const getPropertyValue = (item, property, specificationName, languageId = 23) => {
    const specification = item[specificationName]?.find(spec => spec.language_id === languageId);
    return specification?.[property] || item[specificationName]?.find(spec => spec.language_id === 23)?.[property] || "";
};

export const getMenuName = (menu, language_id) => getPropertyValue(menu, "name", "MenuSpecification", language_id);

export const getCategoryName = (category, language_id) => getPropertyValue(category, "name", "Category_Specification", language_id);

export const getCategoryDescription = (category, language_id) => getPropertyValue(category, "description", "Category_Specification", language_id);

export const getItemName = (item, language_id) => getPropertyValue(item, "name", "ItemSpecifications", language_id);

export const getDescription = (item, language_id) => getPropertyValue(item, "description", "ItemSpecifications", language_id).split("\n").map((item, index) => (
    <Fragment key={index}>{item}<br /></Fragment>
));


// if item has type, price will be on selection and this function translate item name based on language id
//*in here only return item name by one langugae and language_id is empty in api
export const getItemTypeName = (itemTypes, property, specificationName, languageId = 23) => {
    const specification = itemTypes[specificationName]?.find(spec => spec.language_id === languageId);
    return specification?.[property] || itemTypes[specificationName]?.find(spec => spec.language_id === 23)?.[property] || itemTypes.name || "";
};


// if item has type, price will be on selection and this function translate price on selection text based on language id
export const getPriceOnSelectionByLanguage = (langId) => {
    switch (langId) {
        case 23:
            return "Price on selection";
        case 4:
            return "السعر على الاختيار";
        case 60:
            return "نرخ بەپێی هەڵبژاردن";
        case 116:
            return "Seçimdeki fiyat";
        case 86:
            return "قیمت در انتخاب";
    }
}

export const getTypesNameByDifferentLangId = (langId) => {
    switch (langId) {
        case 23:
            return "Types";
        case 4:
            return "انواع";
        case 60:
            return "جۆرەکان";
        case 116:
            return "Tipler";
        case 86:
            return "انواع";
    }
}

export const showMenuListNameByLangId = (langId) => {
    switch (langId) {
        case 23:
            return "Select a Menu";
        case 4:
            return "حدد قائمة";
        case 60:
            return "مێنۆیەک هەڵبژێرە";
        case 116:
            return "Menü seçin";
        case 86:
            return " منو منتخب کنید";
    }
}

