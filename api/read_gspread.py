import gspread
import re
import uuid

gc = gspread.service_account(filename="savethemoney-8c87d7313121.json")
sheet = gc.open("MoneyBook").worksheet("가계부")
data = sheet.get_all_values()

def read():
    print(sheet)
    print(sheet.acell('D80').value)

# def get_expense_data(card):
#     card_start = {
#         'hyundai': 'B22',
#         'woori': 'H195',
#         'shinhan': 'N66'
#     }

#     first_cell = card_start[card]
#     col = re.sub(r'\d+', '', first_cell)
#     row = re.sub('\D', '', first_cell)
#     result = []

#     while sheet.acell(col+row):
#         print(row)
#         result.append({
#             'uuid': str(uuid.uuid4()),
#             'month': int(sheet.acell(col+row).value),
#             'date': int(sheet.acell(next_letter(col)+row).value),
#             'title': sheet.acell(next_letter(next_letter(col))+row).value,
#             'price': int(sheet.acell(next_letter(next_letter(next_letter(col)))+row).value),
#             'category': sheet.acell(next_letter(next_letter(next_letter(next_letter(col))))+row).value,
#             'instrument': card
#         })

#         row = str(int(row)+1)

#     return result

def get_expense_data(card):
    card_start = {
        'hyundai': (21, 1),
        'woori': (194, 7),
        'shinhan': (65, 13)
    }

    first_cell = card_start[card]
    col = first_cell[0]
    row = first_cell[1]
    result = []

    while 1:
        print('col =', col)
        print('row =', row)
        print('data =', data[col][row])
        result.append({
            'uuid': str(uuid.uuid4()),
            'month': int(data[col][row]),
            'date': int(data[col][row+1]),
            'title': data[col][row+2],
            'price': int(data[col][row+3]),
            'category': data[col][row+4],
            'instrument': card
        })
        print("len =", len(data))
        if not col + 1 < len(data) or not data[col+1][row]:
            return result
        col += 1

def next_letter(input):
    return chr(ord(input) + 1)
    
def main():
    result = []
    result += get_expense_data('hyundai')
    result += get_expense_data('shinhan')
    result += get_expense_data('woori')
    print(result)
    return(result)


if __name__ == '__main__':
    main()
    # print(data)