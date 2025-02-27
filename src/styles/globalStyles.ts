import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';

export const globalStyles = StyleSheet.create({
    flex1:{ flex: 1 },
    navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blue,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    listContainer: {
        flex: 1,
        marginVertical: 40,
        backgroundColor: colors.card,
    },
    listView: {
        flexGrow: 0,
        borderColor: colors.border,
        borderWidth: 0.8,
        borderRadius: 4,
        paddingHorizontal: 4,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    borderItem: {
        borderBottomWidth: 0.8,
        borderBottomColor: colors.border,
    },
    lastListItem: {
        borderBottomWidth: 0,
    },
    listItemText: {
        fontSize: 14,
        marginBottom: 2,
        fontFamily: fonts.Bold,
        color: colors.text,
    },
    listItemID: {
        fontSize: 10,
        color: colors.textLight,
        fontFamily: fonts.Regular,
    },
    arrowIcon: {
        fontSize: 18,
        color: colors.textLight,
    },
    buttonContainer: {
        backgroundColor: colors.background,
        paddingVertical: 16,
    },

    buttonPrimary: {
        backgroundColor: colors.accent,
        paddingVertical: 16,
        borderRadius: 4,
        alignItems: 'center',
        width: '100%',
    },
    buttonSecondary: {
        backgroundColor: colors.secondary,
        paddingVertical: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 8,
        borderColor: colors.border,
        borderWidth: 0.3,
    },
    buttonDanger: {
        backgroundColor: colors.danger,
        paddingVertical: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        fontFamily: fonts.Bold,
        color: colors.textPrimary,
        fontSize: 12,
    },
    buttonTextDanger: {
        fontFamily: fonts.Bold,
        color: colors.white,
        fontSize: 12,
    },

    title: {
        fontSize: 24,
        fontFamily: fonts.Bold,
        marginBottom: 20,
    },
    inputText: {
        fontFamily: fonts.Bold,
        fontSize: 12,
        marginBottom: 10,
    },
    input: {
        borderWidth: 0.8,
        borderColor: colors.border,
        marginBottom: 5,
        padding: 8,
        borderRadius: 4,
        height: 45,
    },
    inputDisabled: {
        backgroundColor: colors.secondary,
        opacity: 0.5,
    },
    inputError: {
        borderColor: colors.danger,
    },
    error: {
        color: colors.danger,
        fontSize: 11,
        fontFamily: fonts.Bold,
        marginBottom: 10,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: colors.secondary,
        padding: 12,
        borderRadius: 4,
        marginBottom: 12,
    },


    containerDetail: {
        flex: 1,
        paddingHorizontal: '10%',
    },
    headerDetail: {
        marginVertical: 40,
    },
    titleDetail: {
        marginBottom: 0,
    },
    subTitleDetail: {
        fontSize: 13,
        marginTop: 4,
        color: colors.textLight,
        fontFamily: fonts.Regular,
    },

    containerTextDetail: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    column50: {
        width: '50%',
    },
    textDetail: {
        fontSize: 12,
        fontFamily: fonts.Regular,
        color: colors.textLight,
    },
    textDetailBold: {
        fontSize: 12,
        fontFamily: fonts.Bold,
    },

    logo: {
        width: 180,
        height: undefined,
        aspectRatio: 16 / 9,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 8,
        resizeMode: 'contain',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalHeader: {
        width: '100%',
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        padding: 15,
        alignItems: 'flex-end',
        shadowColor: colors.overlay,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 0.5,
    },
    modalBody: {
        padding: 30,
        borderBottomColor: colors.border,
        borderBottomWidth: 0.8,
    },

    modalText: {
        fontSize: 18,
        fontFamily: fonts.Bold,
        color: colors.textLight,
        textAlign: 'center',
    },
});
